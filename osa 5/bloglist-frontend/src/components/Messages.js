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

export default Messages