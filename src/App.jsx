import { useAtomValue } from 'jotai'
import { currentScreenAtom } from './store/atoms'
import { useDebugBorders } from './hooks/useDebugBorders'
import LandingScreen from './components/LandingScreen'
import CameraScreen from './components/CameraScreen'

function App() {
  const currentScreen = useAtomValue(currentScreenAtom)
  
  // Initialize debug borders functionality
  useDebugBorders()

  return (
    <>
      {currentScreen === 'landing' && <LandingScreen />}
      {currentScreen === 'camera' && <CameraScreen />}
    </>
  )
}

export default App
