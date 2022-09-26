import { ButtonV2, TextInputV2 } from "@meshkorea/vroong-design-system-web";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

interface TodoAddFormProps {
  onCreate: (value: string) => void;
}

const TodoAddForm = ({ onCreate }: TodoAddFormProps) => {
  const [value, setValue] = useState<string>();

  const handleInputValue = useCallback((v: string) => {
    setValue(v);
  }, []);

  const onSubmit = useCallback(() => {
    onCreate(value!);
    setValue("");
  }, [onCreate, value]);

  return (
    <AddTodoWrap>
      <TextInputV2
        width="400px"
        placeholder="값을 입력해주세요"
        value={value}
        onChange={handleInputValue}
      />
      <ButtonV2 onClick={onSubmit} disabled={!value}>
        확인
      </ButtonV2>
    </AddTodoWrap>
  );
};

export default TodoAddForm;

const AddTodoWrap = styled.div`
  margin: 0 auto;
`;
