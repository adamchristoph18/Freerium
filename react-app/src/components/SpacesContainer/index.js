import "./SpacesContainer.css";


function SpacesContainer({ spaces }) {
    return (
        <div className="spaces-container">
            <h3 className="spaces-title">Spaces</h3>
            {spaces.map(space => (
                <span className="space-tile clickable" title={space.description} key={space.id}>{space.name}</span>
            ))}
        </div>
    )
}

export default SpacesContainer;
