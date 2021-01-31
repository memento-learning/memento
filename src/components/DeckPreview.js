const DeckPreview = (props) => {
    return(
        <article className='deck'>
            <img
                src = {props.img}
            />  
            <h1>{props.title}</h1>
            <h4>{props.description}</h4>
        </article>
    );
}

export default DeckPreview