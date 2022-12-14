const Notification = ({message}) => {
    const notificationStyle = {
        color: "black",
        fontSize: "20px",
        backgroundColor: "gray",
        padding: "10px"
      }

    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification