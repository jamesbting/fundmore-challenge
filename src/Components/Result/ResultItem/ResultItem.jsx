import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

export default class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: this.props.results };
  }

  //new search
  componentDidUpdate(newProps) {
    if (newProps.results !== this.state.results) {
      this.setState({ results: newProps.results });
    }
  }

  render() {
    const results = this.props.results;
    return (
      <div>
        Results:
        {results.map((result) => (
          <Card className={"root"} key={result.id}>
            <CardActionArea>
              <CardMedia
                className={"media"}
                image={`${result.image.url}`}
                title={`Image of ${result.name}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {result.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Alignment: {result.biography.alignment}
                  <br></br>
                  Publisher: {result.biography.publisher}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    );
  }
}
// const ResultItem = ({ results }) => {
//   return (
//     <div>
//       Results:
//       {results.map((result) => (
//         <Card className={"root"} key={result.id}>
//           <CardActionArea>
//             <CardMedia
//               className={"media"}
//               image={`${result.image.url}`}
//               title={`Image of ${result.name}`}
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="h2">
//                 {result.name}
//               </Typography>
//               <Typography variant="body2" color="textSecondary" component="p">
//                 Alignment: {result.biography.alignment}
//                 <br></br>
//                 Publisher: {result.biography.publisher}
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default ResultItem;
