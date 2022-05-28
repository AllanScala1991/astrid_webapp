import './index.css'
import loading from '../../../assets/loading.gif'

export function Loading() {
    return (
        <div className="loadingContainer">
            <img src={loading} alt="loading image" className="loadingGif" />
        </div>
    )
}