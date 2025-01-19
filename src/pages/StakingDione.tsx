import { useEffect, useState } from "react";
import { StakingProgress } from "../components/staking-dione/StakingProgress";
import { GradientButton } from "../components/staking-dione/GradientButton";
import { StakeAmountStep } from "../components/staking-dione/steps/StakeAmountStep";
import { NodeInfoStep } from "../components/staking-dione/steps/NodeInfoStep";
import { StakingDurationStep } from "../components/staking-dione/steps/StakingDurationStep";
import { RewardAddressStep } from "../components/staking-dione/steps/RewardAddressStep";
import { DelegationFeeStep } from "../components/staking-dione/steps/DelegationFeeStep";
import { StakingSummaryStep } from "../components/staking-dione/steps/StakingSummaryStep";
import { DioneProvider, useDione } from "../contexts/DioneContext";
import { calculateTimeRemaining } from "../components/staking-dione/utils/format";
import { fetchDevices } from "../api/devices";
import { Device } from "../types/device";

const STEPS = [
  { number: 1, title: "Stake Amount" },
  { number: 2, title: "Node Info" },
  { number: 3, title: "Staking Duration" },
  { number: 4, title: "Reward Address" },
  { number: 5, title: "Delegation Fee" },
];

function StakingDioneContent() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { walletAddress, status, balance, connectWallet, disconnectWallet } =
    useDione();

  const [currentStep, setCurrentStep] = useState(1);
  const [showSummary, setShowSummary] = useState(false);

  const [formData, setFormData] = useState({
    stakeAmount: "",
    nodeId: "",
    blsPublicKey: "",
    blsSignature: "",
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    useConnectedWallet: true,
    customAddress: "",
    delegationFee: 1,
  });

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const response = await fetchDevices();
        setDevices(response.data);

        // Check if there is at least one device and set initial node data
        if (response.data.length > 0) {
          const { node } = response.data[0];
          setFormData((prev) => ({
            ...prev,
            nodeId: node?.nodeID || "",
            blsPublicKey: node?.publicKey || "",
            blsSignature: node?.blsSignature || "",
          }));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load devices");
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
  }, []);

  if (loading) {
    return          <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
    ;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const steps = STEPS.map((step) => ({
    ...step,
    isActive: step.number === currentStep,
    isCompleted: step.number < currentStep,
  }));

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setCurrentStep(1);
    setFormData({
      stakeAmount: "",
      nodeId: devices[0]?.node?.nodeID || "",
      blsPublicKey: devices[0]?.node?.publicKey || "",
      blsSignature: devices[0]?.node?.blsSignature || "",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      useConnectedWallet: true,
      customAddress: "",
      delegationFee: 1,
    });
  };

  const getSummaryData = () => {
    const timeRemaining = calculateTimeRemaining(formData.endDate);

    return {
      network: "Odyssey Chain",
      stakeAmount: formData.stakeAmount,
      endingIn: {
        days: timeRemaining.days,
        hours: timeRemaining.hours,
        minutes: timeRemaining.minutes,
        date: formData.endDate.toLocaleDateString(),
      },
      nodeId: formData.nodeId,
      rewardsAddress: formData.useConnectedWallet
        ? walletAddress || ""
        : formData.customAddress,
      delegationFee: formData.delegationFee,
      delegationRewardAddress: formData.useConnectedWallet
      ? walletAddress || ""
      : formData.customAddress,
    };
  };

  return (
    <div className="mb-8 bg-purple-900/30 p-4 rounded-lg border border-purple-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-[300px_1fr] gap-8">
        <div>
          <StakingProgress currentStep={currentStep} steps={steps} />
          {status === "UnLock" && (
            <GradientButton className="w-full mt-6" onClick={connectWallet}>
              Connect Wallet
            </GradientButton>
          )}
          {status === "Dashboard" && (
            <GradientButton className="w-full mt-6" onClick={disconnectWallet}>
              Disconnect Wallet
            </GradientButton>
          )}
        </div>

        <div className="bg-[#1A1825] rounded-xl p-8">
          {!showSummary ? (
            <>
              {currentStep === 1 && (
                <StakeAmountStep
                  walletConnected={status === "Dashboard"}
                  walletAddress={walletAddress || ""}
                  balance={balance || "0"}
                  stakeAmount={formData.stakeAmount}
                  onStakeAmountChange={(value) =>
                    updateFormData("stakeAmount", value)
                  }
                  onNext={handleNext}
                  onBack={handleBack}
                  minimumStakeAmount={500000}
                />
              )}

{currentStep === 2 && (
                <NodeInfoStep
                  nodeId={formData.nodeId}
                  blsPublicKey={formData.blsPublicKey}
                  blsSignature={formData.blsSignature}
                  onNodeIdChange={(value) => updateFormData('nodeId', value)}
                  onBlsPublicKeyChange={(value) => updateFormData('blsPublicKey', value)}
                  onBlsSignatureChange={(value) => updateFormData('blsSignature', value)}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 3 && (
                <StakingDurationStep
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  onStartDateChange={(date) => updateFormData('startDate', date)}
                  onEndDateChange={(date) => updateFormData('endDate', date)}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 4 && (
                <RewardAddressStep
                  useConnectedWallet={formData.useConnectedWallet}
                  customAddress={formData.customAddress}
                  onUseConnectedWalletChange={(value) => updateFormData('useConnectedWallet', value)}
                  onCustomAddressChange={(value) => updateFormData('customAddress', value)}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 5 && (
                <DelegationFeeStep
                  fee={formData.delegationFee}
                  useConnectedWallet={formData.useConnectedWallet}
                  customAddress={formData.customAddress}
                  onUseConnectedWalletChange={(value) => updateFormData('useConnectedWallet', value)}
                  onCustomAddressChange={(value) => updateFormData('customAddress', value)}
                  onFeeChange={(value) => updateFormData('delegationFee', value)}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
            </>
          ) : (
            <StakingSummaryStep
              summary={getSummaryData()}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default function StakingDione() {
  return (
    <DioneProvider>
      <StakingDioneContent />
    </DioneProvider>
  );
}

