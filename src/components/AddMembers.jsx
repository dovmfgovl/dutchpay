import {CenteredOverlayForm} from "./CenteredOverlayForm";
import {Button, Container, Form, Row} from "react-bootstrap";
import {InputTags} from "react-bootstrap-tagsinput";
import {useRecoilState, useRecoilValue} from "recoil";
import {gruopMembersState} from "../state/gruopMembers";
import {useState} from "react";
import {groupNameState} from "../state/groupName";
import { StyledH2, StyledRow, StyledSubmitButton } from "./CreateGroup";

export const AddMembers = () => {
    const [groupMembers, setGroupMembers] = useRecoilState(gruopMembersState)
    const groupName = useRecoilValue(groupNameState)
    const [formSubmitted, setFormSubmitted] = useState(false) /*처음 렌더링 됐을 때는 formSubmitted가 된 게 아니다*/
    const handleSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)/*저장 버튼을 눌렀을 때 span 문구가 보이도록 처리*/
    }

    return (
        <CenteredOverlayForm>
            <Container>
                <Form noValidate onSubmit={handleSubmit}>
                    <StyledRow>
                        <Row className="aligin-items-start">
                            <StyledH2>{groupName} 그룹에 속한 사람들의 이름을 모두 적어주세요.</StyledH2>
                        </Row>
                        <Row className="aligin-items-center">
                            <InputTags
                                placeholder="이름 간 띄어 쓰기"
                                onTags={(value) => setGroupMembers(value.values)}
                            />
                            {/*formSubmitted가 됐을 때만 문구 출력. 즉, 처음 렌더링 되자마자 바로 보이지 않도록 처리한 것*/}
                            {/*조건부 : groupMembers의 length가 0일 때만 문구 출력*/}
                            {formSubmitted && groupMembers.length === 0 && (
                                <span>그룹 멤버들의 이름을 입력해 주세요.</span>
                            )}
                        </Row>
                        <Row>
                            <StyledSubmitButton>저장</StyledSubmitButton>
                        </Row>
                    </StyledRow>
                </Form>
            </Container>
        </CenteredOverlayForm>
    )
}