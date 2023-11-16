import PropTypes from 'prop-types'

const Messages = ({error, notice}) => (
    
  (error &&
    (<div className='error'>
      {error}
    </div>  )
  )||(notice &&
    (<div className='note'>
      {notice}
    </div>  )
  )

)

Messages.propTypes = {
  error: PropTypes.string,
  notice: PropTypes.string,
}

export default Messages