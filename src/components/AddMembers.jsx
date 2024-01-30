import {CenteredOverlayForm} from "./CenteredOverlayForm";
import {InputTags} from "react-bootstrap-tagsinput";
import {useRecoilState, useRecoilValue} from "recoil";
import {gruopMembersState} from "../state/gruopMembers";
import {useState} from "react";
import {groupNameState} from "../state/groupName";
import styled from "styled-components";

export const AddMembers = () => {
    const [groupMembers, setGroupMembers] = useRecoilState(gruopMembersState)
    const groupName = useRecoilValue(groupNameState)
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault()
        setValidated(true) /*저장 버튼을 눌렀을 때 span 문구가 보이도록 처리*/
    }

    const header = `${groupName} 그룹에 속한 사람들의 이름을 모두 적어주세요.`

    return (
        <CenteredOverlayForm
            title={header}
            validated={validated}
            handleSubmit={handleSubmit}
        >
            <InputTags
                placeholder="이름 간 띄어 쓰기"
                onTags={(value) => setGroupMembers(value.values)}
            />
            {/*formSubmitted가 됐을 때만 문구 출력. 즉, 처음 렌더링 되자마자 바로 보이지 않도록 처리한 것*/}
            {/*조건부 : groupMembers의 length가 0일 때만 문구 출력*/}
            {validated && groupMembers.length === 0 && (
                <StyledErrorMessage>그룹 멤버들의 이름을 입력해 주세요.</StyledErrorMessage>
            )}
        </CenteredOverlayForm>
    )
}

const StyledErrorMessage = styled.span`
    color: red;
`