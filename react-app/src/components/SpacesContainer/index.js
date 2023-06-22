import "./SpacesContainer.css";


function SpacesContainer({ spaces }) {
    return (
        <div className="spaces-container">
            {spaces.map(space => (
                <span className="space-tile" key={space.id}>{space.name}</span>
            ))}
        </div>
    )
}

export default SpacesContainer;
