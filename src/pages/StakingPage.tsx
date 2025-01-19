import React, { useState } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle, XCircle, Copy } from 'lucide-react';
import { DateRangeSelector } from '../components/staking/DateRangeSelector';
import { ValidatorReview } from '../components/staking/ValidatorReview';
import { StakingStep } from '../components/staking/StakingStep';
import { StakingInput } from '../components/staking/StakingInput';
import { SetupProgress } from '../components/setup/SetupProgress';
import { SetupButton } from '../components/setup/SetupButton';
import { DioneProvider, useDione } from "../contexts/DioneContext";

type NotificationType = 'success' | 'error' | 'info' | null;

interface Notification {
  type: NotificationType;
  message: string;
  id: number;
}

const WalletInfo: React.FC = () => {
  const { walletAddress, status, connectWallet, disconnectWallet } = useDione();

  return (
    <div>
      <h1>Wallet Info</h1>
      <p>Address: {walletAddress}</p>
      <p>Status: {status}</p>
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={disconnectWallet}>Disconnect Wallet</button>
    </div>
  );
};

export function StakingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showReview, setShowReview] = useState(false);
  const [formData, setFormData] = useState({
    walletAddress: '',
    privateKey: '',
    amount: '',
    txid: '',
    importTxId: '',
    oAddress: '',
    nodeId: 'NodeID-HBZJTeTJi1rin8vTWMnyFsRuMH186Lm5e',
    startTime: '',
    endTime: '',
    duration: 12,
    rewardAddress: '',
    fee: 10,
    stakeAmount: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dChainBalance, setDChainBalance] = useState<number | null>(null);
  const [oChainBalance, setOChainBalance] = useState<number | null>(null);

  const addNotification = (type: NotificationType, message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { type, message, id }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addNotification('success', `${label} copied to clipboard`);
    } catch (err) {
      addNotification('error', 'Failed to copy to clipboard');
    }
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => {
    if (showReview) {
      setShowReview(false);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const updateFormData = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const TransactionInfo = () => {
    if (!formData.txid && !formData.oAddress && !formData.importTxId && !formData.nodeId) return null;

    return (
      <div className="bg-gradient-to-r from-purple-900/90 to-purple-800/90 p-6 rounded-lg shadow-lg border border-purple-500/50 mb-8">
        <h3 className="text-purple-100 font-semibold mb-4 flex items-center gap-2">
          <span className="bg-purple-500/20 p-1.5 rounded">
            <CheckCircle className="w-5 h-5 text-purple-300" />
          </span>
          Transaction Summary
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Node ID', value: formData.nodeId },
            { label: 'Export Transaction ID', value: formData.txid },
            { label: 'Import Transaction ID', value: formData.importTxId },
            { label: 'O-chain Address', value: formData.oAddress }
          ].map(({ label, value }) => value && (
            <div key={label} className="bg-purple-950/50 p-4 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-300">{label}</span>
                <button
                  onClick={() => copyToClipboard(value, label)}
                  className="text-purple-400 hover:text-purple-200 transition-colors flex items-center gap-1"
                >
                  <span className="text-sm">Copy</span>
                  <Copy size={14} />
                </button>
              </div>
              <p className="text-purple-100 text-sm font-mono break-all">{value}</p>
            </div>
          ))}
        </div>
        <DioneProvider>
      <WalletInfo />
    </DioneProvider>
      </div>
    );
  };

  const handleApiCall = async (endpoint: string, data: any, successCallback: (data: any) => void) => {
    try {
      setIsProcessing(true);
      const response = await axios.post(endpoint, data);
      successCallback(response.data);
      addNotification('success', 'Operation completed successfully!');
    } catch (error) {
      console.error(`Error during ${endpoint}:`, error);
      addNotification('error', 'An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  const fetchBalances = async () => {
    try {
      const { data: dChainData } = await axios.get(
        `http://100.70.162.111:3004/api/v1/wallet/balance?walletAddress=${formData.walletAddress}`
      );
      const { data: oChainData } = await axios.get(
        `http://100.70.162.111:3004/api/v1/o-chain/balance?oAddress=${formData.oAddress}`
      );

      setDChainBalance(dChainData.balance || 0);
      setOChainBalance(oChainData.balance || 0);
    } catch (error) {
      console.error('Error fetching balances:', error);
      addNotification('error', 'Failed to fetch balances');
    }
  };
  const handleExportFunds = () => {
    if (!formData.walletAddress || !formData.privateKey || !formData.amount) {
      addNotification('error', 'Please fill in all required fields');
      return;
    }

    handleApiCall(
      'http://100.70.162.111:3004/api/v1/wallet/process',
      {
        walletAddress: formData.walletAddress,
        privateKey: formData.privateKey,
        dioneAmount: parseInt(formData.amount, 10),
      },
      (data) => {
        updateFormData('txid', data.txid);
        updateFormData('oAddress', data.oAddressString);
        handleNext();
        fetchBalances(); // Fetch balances after export funds
      }
    );
  };

  const WalletBalances = () => {
    if (dChainBalance === null && oChainBalance === null) return null;

    return (
      <div className="mb-8 bg-purple-900/30 p-4 rounded-lg border border-purple-500">
        <h3 className="text-lg text-purple-50 font-semibold mb-2">Your Wallet Balances</h3>
        <ul className="text-sm text-purple-200 space-y-2">
          {dChainBalance !== null && (
            <li>
              <strong>D-Chain Balance:</strong> {dChainBalance} DIONE
            </li>
          )}
          {oChainBalance !== null && (
            <li>
              <strong>O-Chain Balance:</strong> {oChainBalance} DIONE
            </li>
          )}
        </ul>
      </div>
    );
  };

  const handleImportFunds = () => {
    if (!formData.privateKey) {
      addNotification('error', 'Private key is required');
      return;
    }

    handleApiCall(
      'http://100.70.162.111:3004/api/v1/import',
      {
        privateKey: formData.privateKey,
      },
      (data) => {
        updateFormData('importTxId', data.txid);
        handleNext();
      }
    );
  };

  const handleAddValidator = () => {
    if (!formData.nodeId || !formData.oAddress || !formData.startTime || 
        !formData.endTime || !formData.fee || !formData.stakeAmount) {
      addNotification('error', 'Please fill in all required fields');
      return;
    }

    handleApiCall(
      'http://100.70.162.111:3004/api/v1/addValidator/add-validator',
      {
        nodeId: formData.nodeId,
        oAddress: formData.oAddress,
        startTime: formData.startTime,
        endTime: formData.endTime,
        delegationFee: formData.fee,
        stakeAmount: formData.stakeAmount
      },
      () => {
        addNotification('success', 'Validator added successfully!');
      }
    );
  };

  const NotificationToast = ({ type, message, id }: Notification) => {
    const baseClasses = "fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 flex items-center space-x-2 max-w-md";
    const typeClasses = {
      success: "bg-green-600 text-white",
      error: "bg-red-600 text-white",
      info: "bg-blue-600 text-white"
    };

    const icon = {
      success: <CheckCircle className="w-5 h-5" />,
      error: <XCircle className="w-5 h-5" />,
      info: <AlertCircle className="w-5 h-5" />
    };

    return type && (
      <div className={`${baseClasses} ${typeClasses[type]}`} style={{ zIndex: 1000 }}>
        {icon[type]}
        <span className="text-sm font-medium">{message}</span>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-purple-50 mb-6">Staking Process</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
      <WalletBalances />
        <div className="space-y-6">
          <SetupProgress currentStep={currentStep} totalSteps={3} />

          {currentStep === 1 && (
            <StakingStep
              title="Step 1: Export Funds from D chain to O chain"
              description="Enter your wallet details and amount to export funds."
              actions={
                <SetupButton onClick={handleExportFunds} disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Export Funds'}
                </SetupButton>
              }
            >
              <StakingInput
                id="walletAddress"
                label="Wallet Address"
                value={formData.walletAddress}
                onChange={(e) => updateFormData('walletAddress', e.target.value)}
                placeholder="Enter your wallet address"
                required
              />
              <StakingInput
                id="privateKey"
                label="Private Key"
                type="password"
                value={formData.privateKey}
                onChange={(e) => updateFormData('privateKey', e.target.value)}
                placeholder="Enter your private key"
                required
              />
              <StakingInput
                id="amount"
                label="Amount to Export"
                value={formData.amount}
                onChange={(e) => updateFormData('amount', e.target.value)}
                placeholder="Enter amount"
                type="number"
                min="0"
                required
              />
            </StakingStep>
          )}

          {currentStep === 2 && (
            <StakingStep
              title="Step 2: Import Funds to O chain"
              description="Confirm funds import with your private key."
              actions={
                <>
                  <SetupButton variant="secondary" onClick={handleBack}>
                    Back
                  </SetupButton>
                  <SetupButton onClick={handleImportFunds} disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Import Funds'}
                  </SetupButton>
                </>
              }
            >
              <div className="bg-purple-900/30 p-4 rounded-lg mb-4">
                <p className="text-sm text-purple-300">
                  Please confirm the transaction details above before proceeding with the import.
                </p>
              </div>
            </StakingStep>
          )}

          {currentStep === 3 && !showReview && (
            <StakingStep
              title="Step 3: Add Validator"
              description="Set up your validator details and configure staking parameters."
              actions={
                <>
                  <SetupButton variant="secondary" onClick={handleBack}>
                    Back
                  </SetupButton>
                  <SetupButton onClick={() => setShowReview(true)} disabled={!formData.startTime || !formData.stakeAmount}>
                    Review Details
                  </SetupButton>
                </>
              }
            >
              <DateRangeSelector
                startTime={formData.startTime}
                endTime={formData.endTime}
                duration={formData.duration}
                onStartTimeChange={(value) => updateFormData('startTime', value)}
                onEndTimeChange={(value) => updateFormData('endTime', value)}
                onDurationChange={(months) => updateFormData('duration', months)}
              />
              <StakingInput
                id="fee"
                label="Delegation Fee (%)"
                value={formData.fee}
                onChange={(e) => updateFormData('fee', Number(e.target.value))}
                placeholder="Enter delegation fee"
                type="number"
                min="0"
                max="100"
                required
              />
              <StakingInput
                id="stakeAmount"
                label="Stake Amount"
                value={formData.stakeAmount}
                onChange={(e) => updateFormData('stakeAmount', e.target.value)}
                placeholder="Enter stake amount"
                type="number"
                min="0"
                required
              />
            </StakingStep>
          )}

          {currentStep === 3 && showReview && (
            <StakingStep
              title="Review and Confirm"
              description="Review your validator setup and confirm the staking details."
              actions={
                <>
                  <SetupButton variant="secondary" onClick={handleBack}>
                    Back to Edit
                  </SetupButton>
                  <SetupButton onClick={handleAddValidator} disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Confirm & Add Validator'}
                  </SetupButton>
                </>
              }
            >
              <ValidatorReview formData={formData} />
            </StakingStep>
          )}
        </div>

        <div className="sticky top-8">
          <TransactionInfo />
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map((notification) => (
          <NotificationToast key={notification.id} {...notification} />
        ))}
      </div>
    </div>
  );
}


/*

curl https://testnode.dioneprotocol.com/ext/bc/O/rpc -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"omegavm.getBalance",
  "params" :{
      "addresses":["O-testnet1n5qrhn6cnqhda5usk8du4s676tjpcvv00j9qth"]
  }
}' -H 'content-type:application/json;' 


*/