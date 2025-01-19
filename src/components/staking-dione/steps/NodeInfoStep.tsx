import { StakingInput } from '../StakingInput';
import { GradientButton } from '../GradientButton';

interface NodeInfoStepProps {
  nodeId: string;
  blsPublicKey: string;
  blsSignature: string;
  onNodeIdChange: (value: string) => void;
  onBlsPublicKeyChange: (value: string) => void;
  onBlsSignatureChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function NodeInfoStep({
  nodeId,
  blsPublicKey,
  blsSignature,
  onNodeIdChange,
  onBlsPublicKeyChange,
  onBlsSignatureChange,
  onNext,
  onBack
}: NodeInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-[#13111C] rounded-lg p-4">
        <div className="text-gray-300">
          <p>
          The Node ID is the ID associated with the machine that you set up to act as validator to the network. 
          If you do not have a node, you can delegate, or learn how to set up a node.</p>
          <p>
          These Data are already retrieved from your running node on your ORION - you can directly proceed with the next step.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold">Node ID</h2>

      <StakingInput
        id="nodeid"
        label="Node ID"
        value={nodeId}
        onChange={(e) => onNodeIdChange(e.target.value)}
        placeholder="Enter your Node ID"
      />

      <div className="bg-[#13111C] rounded-lg p-4">
        <p className="text-gray-300">
          BLS Information is required for permissionless validation on the Primary Network.
        </p>
      </div>

      <StakingInput
        id="blskey"
        label="BLS Public Key"
        value={blsPublicKey}
        onChange={(e) => onBlsPublicKeyChange(e.target.value)}
        placeholder="0x..."
      />

      <StakingInput
        id='blsig'
        label="BLS Signature"
        value={blsSignature}
        onChange={(e) => onBlsSignatureChange(e.target.value)}
        placeholder="0x..."
      />

      <div className="flex justify-between pt-4">
        <GradientButton variant="secondary" onClick={onBack}>
          Back
        </GradientButton>
        <GradientButton onClick={onNext}>
          Next
        </GradientButton>
      </div>
    </div>
  );
}