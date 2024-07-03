import {postRequest} from "../requests";
import Accordion from "react-bootstrap/Accordion";
import {useState} from "react";

export const ParameterLimit = ({patient_id, parameter, limits}) => {
    const [lowerLimit, setLowerLimit] = useState(limits?.lower_limit);
    const [upperLimit, setUpperLimit] = useState(limits?.upper_limit);
    const handleSubmit = (event) => {
        event.preventDefault();
        postRequest('set_parameter_limits', {
            patient_id,
            parameter,
            lower_limit: lowerLimit,
            upper_limit: upperLimit
        }).then(() => {

        }).catch(error => console.error(error));
    }


    return (
        <Accordion>
            <Accordion.Item defaultChecked={false} eventKey={parameter}>
                <Accordion.Header>
                    <h5>
                        Set Limits
                    </h5>
                </Accordion.Header>
                <Accordion.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Lower Limit:</label>
                            <input type="number" value={lowerLimit} className="form-control"
                                   placeholder={"Lower Limit"} onChange={(e) => setLowerLimit(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Upper Limit:</label>
                            <input type="number" value={upperLimit} className="form-control"
                                   placeholder={"Upper Limit"} onChange={(e) => setUpperLimit(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};