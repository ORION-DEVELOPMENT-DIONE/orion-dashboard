import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { SetupProgress } from '../components/setup/SetupProgress';
import { SetupStep } from '../components/setup/SetupStep';
import { SetupButton } from '../components/setup/SetupButton';

export function SetupWizard() {
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('setupStep');
    return savedStep ? parseInt(savedStep) : 1;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('setupStep', step.toString());
  }, [step]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const goToWifiConfig = () => {
    localStorage.setItem('setupStep', (step + 1).toString());
    localStorage.setItem('fromWizard', 'true');
    navigate("/pair");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <Settings className="h-6 w-6 text-purple-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-purple-50">Setup Wizard</h1>
          <p className="text-purple-300">Configure your validator node</p>
        </div>
      </div>

      <SetupProgress currentStep={step} totalSteps={7} />

      {step === 1 && (
        <SetupStep
          title="Install CT Clamps"
          actions={
            <SetupButton onClick={handleNext}>Next</SetupButton>
          }
        >
          <p>Attach the CT clamps into your inverter power cables.</p>
          <p>Go to Sensors Installation on the homepage and follow the instructions to securely connect them to your home solar inverter.</p>
        </SetupStep>
      )}

      {step === 2 && (
        <SetupStep
          title="Power Up Devices"
          actions={
            <>
              <SetupButton variant="secondary" onClick={handleBack}>Back</SetupButton>
              <SetupButton onClick={handleNext}>Next</SetupButton>
            </>
          }
        >
          <ul className="list-disc list-inside space-y-2">
            <li>Insert the USB power cable into the Transmitter to turn it on.</li>
            <li>Insert the USB power cable into the Raspberry/Orange Pi to turn it on.</li>
          </ul>
        </SetupStep>
      )}

      {step === 3 && (
        <SetupStep
          title="Connect to WiFi Access Point"
          actions={
            <>
              <SetupButton variant="secondary" onClick={handleBack}>Back</SetupButton>
              <SetupButton onClick={handleNext}>Next</SetupButton>
            </>
          }
        >
          <div className="bg-purple-950/40 p-4 rounded-lg border border-purple-500/20">
            <p>SSID: <span className="font-mono text-purple-100">ORION</span></p>
            <p>Password: <span className="font-mono text-purple-100">orion-w-power</span></p>
          </div>
        </SetupStep>
      )}

      {step === 4 && (
        <SetupStep
          title="Access Device Interface"
          actions={
            <>
              <SetupButton variant="secondary" onClick={handleBack}>Back</SetupButton>
              <SetupButton onClick={handleNext}>Next</SetupButton>
            </>
          }
        >
          <div className="bg-purple-950/40 p-4 rounded-lg border border-purple-500/20">
            <p>URL: <span className="font-mono text-purple-100">http://192.168.4.1</span></p>
          </div>
          <p className="mt-2">If you are using your mobile phone or tablet, please turn off your mobile data to ensure it uses WiFi.</p>
        </SetupStep>
      )}

      {step === 5 && (
        <SetupStep
          title="Configure WiFi Settings"
          actions={
            <>
              <SetupButton variant="secondary" onClick={handleBack}>Back</SetupButton>
              <SetupButton onClick={goToWifiConfig}>Configure WiFi</SetupButton>
            </>
          }
        >
          <p>Click below to go to the WiFi Configuration page.</p>
        </SetupStep>
      )}

      {step === 6 && (
        <SetupStep
          title="Locate Device"
          actions={
            <>
              <SetupButton variant="secondary" onClick={handleBack}>Back</SetupButton>
              <SetupButton onClick={handleNext}>Next</SetupButton>
            </>
          }
        >
          <p>Open the link below to locate your device:</p>
          <div className="bg-purple-950/40 p-4 rounded-lg border border-purple-500/20">
            <p>URL: <span className="font-mono text-purple-100">https://orion.dioneprotocol.com/local</span></p>
          </div>
          <p className="mt-2">If the device fails to connect to your WiFi, it will start the access point again. Return to Step 3 to reconnect.</p>
        </SetupStep>
      )}

      {step > 6 && (
        <SetupStep
          title="Setup Complete"
          actions={
            <SetupButton
              onClick={() => {
                localStorage.removeItem('setupStep');
                setStep(1);
                navigate('/');
              }}
            >
              Finish
            </SetupButton>
          }
        >
          <p>Your system is ready! Click Finish to return to the dashboard.</p>
        </SetupStep>
      )}
    </div>
  );
}