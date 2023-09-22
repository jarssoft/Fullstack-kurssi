const Filter = () => {
    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter