export default function ProductCard(props) {
  console.log(props);
  return (
    <div>
      <h2>{props.name}</h2>
      <img height="600px" width="900px" src={props.image} />
      <h3>Price LKR: {props.price}</h3>
    </div>
  );
}
