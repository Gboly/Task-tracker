import LightModeIcon from '@mui/icons-material/LightMode';

function App(){
    return <div class="container">
        <div class="header"><h1>TODO</h1>
        <button><LightModeIcon fontSize="inherit" color="inherit" /></button></div>
        <form>
            <button><div></div></button>
            <input type="text" placeholder="Create a new todo..." />       
        </form>
        <main>
            <div id="1">
                <button><div class="check">✔</div></button>
                <h3 class="checked">Task 1</h3>
                <button class="delete">✖</button>
            </div>
            <div id="2">
                <button><div class="check">✔</div></button>
                <h3 class="checked">Task 2</h3>
                <button class="delete">✖</button>
            </div>
            <div id="3">
                <button><div></div></button>
                <h3>Task 3</h3>
                <button class="delete">✖</button>
            </div>
            <div id="3">
                <button><div></div></button>
                <h3>Task 4</h3>
                <button class="delete">✖</button>
            </div>            
            <div class="bottom">
            <span>x items completed </span>
            <span class="filter"><span class="filter-option">All</span><span class="filter-option">Active</span><span class="filter-option">completed</span></span>
            <span class="filter-option"> Clear completed</span>                
            </div>
        </main>
        <div class="footer">Drag and drop to reorder list</div>
        
    </div>
}

export default App;