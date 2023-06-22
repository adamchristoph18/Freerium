import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "./SpacesContainer.css";


function SpacesContainer({ spaces }) {
    const { spaceId } = useParams();
    const history = useHistory();

    return (
        <div className="spaces-container">
            <h3 className="spaces-title site-color">Spaces/Categories</h3>
            <span className={!spaceId ? "space-tile clickable space-active" : "space-tile clickable"} onClick={() => history.push('/')}>All Questions</span>
            {spaces.map(space => (
                <span
                    className={parseInt(spaceId) === space.id ? "space-tile clickable space-active" : "space-tile clickable"}
                    title={space.description}
                    key={space.id}
                    onClick={() => history.push(`/spaces/${space.id}/all-questions`)}
                    >{space.name}</span>
            ))}
        </div>
    )
}

export default SpacesContainer;
