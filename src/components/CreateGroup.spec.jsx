import {render, screen} from "@testing-library/react";
import {CreateGroup} from "./CreateGroup";
import userEvent from "@testing-library/user-event";
import {RecoilRoot} from "recoil";

const renderComponent = () => {
    render(
        <RecoilRoot>
            <CreateGroup />
        </RecoilRoot>
    ) /*테스트 하고 싶은 컴포넌트 import*/

    const input = screen.getByPlaceholderText('2024 제주도 여행') /*screen: 렌더링 된 화면(CreateGroup)을 보여줌*/
    const saveButton = screen.getByText('저장')
    const errorMessage = screen.queryByText('그룹 이름을 입력해 주세요.')

    return {
        input,
        saveButton,
        errorMessage
    }
}
describe('그룹 생성 페이지', () => {
    test('그룹 이름 입력 컴포넌트가 렌더링 되는가', () => {
        const {input, saveButton} = renderComponent()

        expect(input).not.toBeNull()
        expect(saveButton).not.toBeNull()
    })

    test('그룹 이름을 입력하지 않고 "저장" 버튼을 클릭 시, 에러 메시지를 노출한다.', async () => {
        const {saveButton, errorMessage} = renderComponent()

        await userEvent.click(saveButton)
        expect(errorMessage).toHaveAttribute('data-valid', 'false')
    })

    test('그룹 이름을 입력 후, "저장" 버튼을 클릭 시, 저장 성공', async () => {
        const {input, saveButton, errorMessage} = renderComponent() /*errorMessage가 뜨지 않는 것으로 성공 인 것을 파악*/

        await userEvent.type(input, '예시 그룹명') /*type이 끝날 때까지 Click이 발생하면 안 됨. 따라서 비동기처리*/
        await userEvent.click(saveButton)

        expect(errorMessage).toHaveAttribute('data-valid', 'true')
    })
})