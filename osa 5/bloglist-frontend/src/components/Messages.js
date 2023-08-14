const Messages = ({error, notice}) => (
    
    (error &&
    (<div>
        {error}
    </div>  )
    )||(notice &&
        (<div>
            {notice}
        </div>  )
        )

    
)

export default Messages