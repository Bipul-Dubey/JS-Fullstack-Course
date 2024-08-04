import { DealCharts, UpcomingEvents } from "@/components";
import { Col, Row } from "antd";

export function Home() {
  return (
    <div>
      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: "460px",
          }}
        >
          <UpcomingEvents />
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: "460px",
          }}
        >
          <DealCharts />
        </Col>
      </Row>
    </div>
  );
}
