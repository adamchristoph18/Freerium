import { useHistory } from "react-router-dom";
import "./SpacesContainer.css";


function SpacesContainer({ spaces }) {
    const history = useHistory();

    return (
        <div className="spaces-container">
            <h3 className="spaces-title site-color">Spaces/Categories</h3>
            {spaces.map(space => (
                <span
                    className="space-tile clickable"
                    title={space.description}
                    key={space.id}
                    onClick={() => history.push(`/spaces/${space.id}/all-questions`)}
                    >{space.name}</span>
            ))}
        </div>
    )
}

export default SpacesContainer;
