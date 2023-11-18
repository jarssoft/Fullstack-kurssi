import PropTypes from "prop-types"
import { useMessageValue } from "../MessageContext"

const Messages = () => {
   const { error, notice } = useMessageValue()

   return (
      (error && <div className="error">{error}</div>) ||
      (notice && <div className="note">{notice}</div>)
   )
}

Messages.propTypes = {
   error: PropTypes.string,
   notice: PropTypes.string,
}

export default Messages
