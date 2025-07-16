
import endpointData from '../endpoint.json'; 

export function Tabs ({ onSelectEndpoint }) {
  return (
    <nav className="list-tabs tabs-navigation"> 
      <ul className="endpoint-list"> 
        {endpointData.map((item, index) => (
          <li key={index} className="endpoint-item"> 
            <a
              onClick={() => onSelectEndpoint(item)}
              className="endpoint endpoint-link" 
              href="#" 
            >
              {item.title}
              <small className={`chip ${item.method.toLowerCase()}`}>
                {item.method}
              </small>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}