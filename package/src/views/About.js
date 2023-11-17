// export default About;
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import foto from "../assets/images/users/sofa.jpg";

const About = () => {
  return (
    <div>
      <Row className="justify-content-center">
        <Col lg="10">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"></i>
              APIE SISTEMĄ
            </CardTitle>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col lg="10">
          <Card>
            <CardBody className="p-4">
              <center>
                <h2>BALDŲ DEFEKTŲ REGISTRAVIMO SISTEMA</h2>
                <h5>
                  Jeigu produkcijoje aptikote bet kokio tipo defektą, būtinai jį užresgistruokite čia.
                </h5>
                <img src={foto} alt="my" width="70%" max-width="1000" />
              </center>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;


