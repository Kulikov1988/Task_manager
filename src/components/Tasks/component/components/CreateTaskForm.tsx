import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store';
import { DivTaskForm } from './TaskForm.style';
import EditTaskForm from './editForm/EditTaskForm';
import { ModalButtonsDiv } from '../../../SharedComponents/Search/modal/Modal.style';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mantine/core';

export type InputType = 'title' | 'description';

export interface handleInputChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: InputType;
}

function CreateTaskForm() {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { userName } = useSelector((state: AppState) => state.authReducer.user);

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    const nameLenght = name.split(' ').length;
    if (nameLenght === 2) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: name.split(' ')[0][0],
    };
  }

  return (
    <>
      <DivTaskForm>
        {/* <b>Hellow {userName}, it is your tasks:</b>
        <Avatar {...stringAvatar(userName)} /> */}
        <ModalButtonsDiv>
          <Button color='indigo' variant={'filled'} onClick={openEditModal}>
            Create a new task
          </Button>
        </ModalButtonsDiv>
      </DivTaskForm>
      <EditTaskForm setIsEditOpen={setIsEditOpen} isEditOpen={isEditOpen} />
    </>
  );
}

export default CreateTaskForm;
