const DeckPreview = ({ img, title, description }) => (
  <article className="deck">
    <img
      src={img}
      alt="deckimg"
    />
    <h1>{title}</h1>
    <h4>{description}</h4>
  </article>
);
export default DeckPreview;
