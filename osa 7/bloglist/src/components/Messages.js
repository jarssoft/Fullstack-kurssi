import PropTypes from "prop-types"
import { useMessageValue } from "../MessageContext"
import { Alert } from "@mui/material"

const Messages = () => {
   const { error, notice } = useMessageValue()

   return (
      (error && <Alert severity="error">{error}</Alert>) ||
      (notice && <Alert severity="success">{notice}</Alert>)
   )
}

Messages.propTypes = {
   error: PropTypes.string,
   notice: PropTypes.string,
}

export default Messages
