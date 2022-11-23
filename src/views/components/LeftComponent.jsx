import WilayahDetail from "../pages/WilayahDetail"
import SelectedCoordinate from "./SelectedCoordinate"
import ToggleMap from "./ToggleMap"

function LeftComponent() {
  return (
    <>
      <div className='absolute left-0 bottom-0 w-full space-y-3 p-5'>
        <WilayahDetail />
        <SelectedCoordinate />
        <ToggleMap />
      </div>
    </>
  )
}

export default LeftComponent
