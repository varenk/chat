const styles = {
    messageWindowMessagesContainer: {
        flexGrow: 2,
        height: '500px',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.4em'
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
          }
    },
    messageYou: {
        justifyContent: 'flex-end',
        py: 0.5
    },
    messageCompanion: {
        justifyContent: 'flex-start',
        py: 0.5
    },
    messageBubbleYou: {
        maxWidth: '60%',
        px: 1.3,
        py: 1,
        pb: 0.3,
        bgcolor: '#cae7ff',
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        borderBottomLeftRadius: 13,
        display: 'flex',
        flexDirection: 'column'
    },
    messageBubbleCompanion: {
        maxWidth: '60%',
        px: 1.3,
        py: 1,
        pb: 0.3,
        bgcolor: '#eee',
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
        display: 'flex',
        flexDirection: 'column'
    },
    dateCaption: {
        fontSize: '11px',
        fontWeight: 'light',
        alignSelf: 'flex-end'
    },

    messageInputCont: {
        display: 'flex',
        pt: 2
    },
    sendIcon: {
        ml: 2,
        mr: 2
    },
    attachIcon: {
        ml: 2
    },
    messageInput: {
        ml: 1
    }
}

export default styles;