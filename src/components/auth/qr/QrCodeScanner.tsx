import { IDetectedBarcode, outline, Scanner, useDevices } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import CustomModal from "@/components/CustomModal";
import { useTranslation } from "react-i18next";

export default function QrCodeScanner() {
  const { t } = useTranslation();
  const [scannedData, setScannedData] = useState<string>('');
  const [isOpenScanner, setIsOpenScanner] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const devices = useDevices();

  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const handleScanQrCode = (data: string) => {
    try {
      if (!data) {
        throw new Error('No data found in QR code.');
      }

      console.log('Scanned QR Code Data:', data);


    } catch (error: any) {
      console.error('Error scanning QR code:', error.message);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsOpenScanner(true);
    setScannedData('');
  }
  const handleScan = (result: IDetectedBarcode[]) => {
    if (result) {
      window.alert(result[0].rawValue);
    }
  };

  return (
    <>
      <div className='relative flex flex-col justify-center items-center bg-primary-bg rounded-2xl w-full md:w-120 max-w-full aspect-square! overflow-hidden'>
        <Scanner
          onScan={handleScan}
          onError={() => console.log("Error")}
          components={{
            onOff: false,
            torch: true,
            zoom: true,
            finder: false,
            tracker: outline,
          }}
          styles={{
            container: { width: "100%", maxWidth: "400px", height: "auto", aspectRatio: "1 / 1", padding: "16px", border: "0px none" },
            video: { borderRadius: 10, aspectRatio: "1 / 1", width: "100%", height: "100%", border: "0px none" },
          }}
          constraints={{
            deviceId: deviceId,
          }}
          scanDelay={2000}
          allowMultiple={true}
        >
          <div className="absolute inset-0 p-4 pointer-events-none">
            <div className="top-12 left-12 absolute border-5 border-white border-r-0 border-b-0 rounded-xs w-10 h-10" />
            <div className="top-12 right-12 absolute border-5 border-white border-b-0 border-l-0 rounded-xs w-10 h-10" />
            <div className="bottom-12 left-12 absolute border-5 border-white border-t-0 border-r-0 rounded-xs w-10 h-10" />
            <div className="right-12 bottom-12 absolute border-5 border-white border-t-0 border-l-0 rounded-xs w-10 h-10" />
          </div>
        </Scanner>
      </div>
      <CustomModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        iconName="fi-rr-check-circle"
        title="Scan Successful"
        body={scannedData}
        buttonText="Close"
        onClick={handleCloseModal}
      />
    </>
  );
}