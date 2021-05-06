import { useNavigate } from "react-router-dom";

export const CardImage = ({ image, inStock, _id }) => {
    console.log(inStock);
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`${_id}`)} className="card-img">
            <img src={image} alt="card" />
            {!inStock && (
                <div className="bg-overlay">
                    <p className="text-size-2">OUT OF STOCK</p>
                </div>
            )}
        </div>
    );
};
