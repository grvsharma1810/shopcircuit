export const Title = ({ name, fastDelivery }) => {
    return (
        <h2 className="card-title">
            {name}
            <div className="flex flex-start">
                {fastDelivery && (
                    <span className="badge-pill bg-green-100">
                        Fast Delivery
                    </span>
                )}
            </div>
        </h2>
    );
};
