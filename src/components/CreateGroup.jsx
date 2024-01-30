import {CenteredOverlayForm} from "./CenteredOverlayForm";
import {Button, Container, Form, Row} from "react-bootstrap";
import {useSetRecoilState} from "recoil";
import {groupNameState} from "../state/groupName";
import {useState} from "react";
import styled from "styled-components";

export const CreateGroup = () => {
    const [validated, setValidated] = useState(false);
    const [validGroupName, setValidGroupName] = useState(false)
    const setGroupName = useSetRecoilState(groupNameState)
    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.currentTarget
        if (form.checkValidity()) {
            setValidGroupName(true)
        } else {
            event.stopPropagation();
            setValidGroupName(false)

        }
        setValidated(true)
    }
    return (
        <CenteredOverlayForm>
            {/* <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <StyledRow>
                    <Row className="aligin-items-start">
                        <StyledH2>먼저, 더치페이 할 그룹의 이름을 정해볼까요?</StyledH2>
                    </Row>
                    <Row className="aligin-items-center"> */}
                        <Form.Group controlId="validationGroupName">
                            <Form.Control
                                type="text"
                                required
                                placeholder="2024 제주도 여행"
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                data-valid={validGroupName}
                            >
                                그룹 이름을 입력해 주세요.
                            </Form.Control.Feedback>
                        </Form.Group>
                    {/* </Row>
                    <Row className="aligin-items-end">
                        <StyledSubmitButton>저장</StyledSubmitButton>
                    </Row>
                  </StyledRow>
                </Form>
            </Container> */}
        </CenteredOverlayForm>
    )
}