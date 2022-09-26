import { ButtonV2 } from "@meshkorea/vroong-design-system-web";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import { TodoItem } from "modules/todo/TodoStore";

interface TodoItemProps {
  item: TodoItem;
  id: number;
  onUpdate: (id: number, value: string) => void;
  onRemove: (id: number) => void;
}

const TodoItem = ({ item, id, onUpdate, onRemove }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = useCallback(() => {
    setIsEdit(!isEdit);
    setInputError(false);
  }, [isEdit]);

  const handleUpdate = useCallback(() => {
    const { value } = inputRef.current!;

    if (!value) {
      setInputError(true);
    } else {
      onUpdate(item.id, value);
      setIsEdit(false);
      setInputError(false);
    }
  }, [item.id, onUpdate]);

  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);

  return (
    <ListItem>
      {inputError && <Required>아이템 이름은 필수값입니다</Required>}
      {isEdit ? (
        <InputWrap>
          <input
            ref={inputRef}
            type="text"
            placeholder="아이템 이름을 입력해주세요"
            defaultValue={item.name}
          />
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
};

export default TodoItem;

const ListItem = styled.li`
  color: ${(props) => props.theme.palette.text.SecondaryText};
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
