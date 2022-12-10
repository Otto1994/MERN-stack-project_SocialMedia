import { Modal, useMantineTheme } from '@mantine/core';
import React  from 'react';
import PostShare from '../PostShare/PostShare';

function ShareModal({modelOpened,setmodelOpend}) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modelOpened}
      onClose={()=>setmodelOpend(false)}
    >
     <PostShare/>
    </Modal>
  );
}
export default ShareModal