import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { screenNameAtom, selectedCameraAtom, navigateToLandingAtom } from '../store/atoms'
import { useCamera } from '../hooks/useCamera'

function CameraScreen() {
  const screenName = useAtomValue(screenNameAtom)
  const [selectedCamera, setSelectedCamera] = useAtom(selectedCameraAtom)
  const navigateToLanding = useSetAtom(navigateToLandingAtom)
  
  const { videoRef, stream, error, isLoading, stopStream } = useCamera(selectedCamera)

  const handleEndMeeting = () => {
    console.log('🔴 User clicked End - stopping camera immediately')
    
    // Explicitly stop camera first
    stopStream()
    
    // Then navigate away (this will also trigger cleanup via selectedCamera = null)
    navigateToLanding()
  }

  const renderVideoContent = () => {
    if (error) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-red-400">
            <div className="text-3xl mb-2">⚠️</div>
            <p className="text-sm">Camera Error</p>
            <p className="text-xs mt-1">{error}</p>
          </div>
        </div>
      )
    }

    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-3xl mb-2">📹</div>
            <p>Starting camera...</p>
          </div>
        </div>
      )
    }

    if (selectedCamera && stream) {
      return (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${
            selectedCamera === 'front' ? 'scale-x-[-1]' : ''
          }`}
        />
      )
    }

    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-3xl mb-2">📷</div>
          <p>Select a camera to start</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Video Feed Area - Always takes up space */}
      <div className="flex-1 p-4 pb-0">
        <div className="relative w-full h-full bg-gray-900 border-2 border-gray-600 rounded-lg overflow-hidden">
          {/* Video content */}
          {renderVideoContent()}
          
          {/* Screen name overlay (bottom left of video) */}
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-80 px-2 py-1 text-white text-sm font-medium">
            {screenName}
          </div>
        </div>
      </div>

      {/* Camera Selection Buttons */}
      <div className="p-4 pt-2">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setSelectedCamera('front')}
            className={`flex-1 p-4 text-lg font-bold rounded-lg border-2 cursor-pointer ${
              selectedCamera === 'front'
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'bg-gray-800 border-gray-600 text-white hover:border-blue-500'
            }`}
          >
            ME
          </button>
          
          <button
            onClick={() => setSelectedCamera('back')}
            className={`flex-1 p-4 text-lg font-bold rounded-lg border-2 cursor-pointer ${
              selectedCamera === 'back'
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'bg-gray-800 border-gray-600 text-white hover:border-blue-500'
            }`}
          >
            YOU
          </button>
        </div>

        {/* End button in bottom right */}
        <div className="flex justify-end">
          <button
            onClick={handleEndMeeting}
            className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 cursor-pointer"
          >
            End
          </button>
        </div>
      </div>
    </div>
  )
}

export default CameraScreen 