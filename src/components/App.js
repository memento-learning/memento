import DeckList from "./DeckList";
import DeckPreview from "./DeckPreview"
import Deck from "./Deck"
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <main>
            <Switch>
                <Route path="/" component={DeckList} exact />
                <Route path="/Deck" component={Deck} exact />
                <Route component={Error} />
            </Switch>
        </main>
    )
}

export default App