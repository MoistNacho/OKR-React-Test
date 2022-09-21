import { ButtonV2 } from "@meshkorea/vroong-design-system-web";
import { observer } from "mobx-react";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import { TodoItem } from "modules/todo/TodoStore";

interface TodoItemProps {
  item: TodoItem;
  id: number;
  onUpdate: (id: number, value: string) => void;
  onRemove: (id: number) => void;
}

const TodoItem = observer(({ item, id, onUpdate, onRemove }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = useCallback(() => {
    setIsEdit(!isEdit);
    setInputError(false);
  }, [isEdit]);

  const handleUpdate = useCallback(() => {
    const name = inputRef.current?.value;

    if (!name) {
      setInputError(true);
    } else {
      onUpdate(item.id, name);
      setIsEdit(false);
      setInputError(false);
    }
  }, [item.id, onUpdate]);

  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);

  return (
    <ListItem>
      {inputError && <Required>내용을 입력해주세요</Required>}
      {isEdit ? (
        <InputWrap>
          <input ref={inputRef} type="text" defaultValue={item.name} />
          <ButtonsWrap>
            <ButtonV2 onClick={handleUpdate}>완료</ButtonV2>
            <ButtonV2 style={{ color: "#fa5c5c" }} onClick={handleEdit}>
              취소
            </ButtonV2>
          </ButtonsWrap>
        </InputWrap>
      ) : (
        <InputWrap>
          <span>{`${id}. ${item.name}`}</span>
          <ButtonsWrap>
            <ButtonV2 onClick={handleEdit}>수정</ButtonV2>
            <ButtonV2 onClick={handleRemove} style={{ color: "#fa5c5c" }}>
              삭제
            </ButtonV2>
          </ButtonsWrap>
        </InputWrap>
      )}
    </ListItem>
  );
});

export default TodoItem;

const ListItem = styled.li`
  color: ${(props) => props.theme.palette.text.SecondaryText};
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonsWrap = styled.div`
  display: flex;
`;

const Required = styled.p`
  font-size: 10px;
  color: #ff4949;
  margin: 0 0 4px;

  ::before {
    display: inline;
    content: "⚠ ";
  }
`;
