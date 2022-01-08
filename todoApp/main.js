import './style.css'

import Model from './src/model';
import View from './src/view';
import Contoller from './src/controller';

const model = new Model()
const view = new View()
const controller = new Contoller(model, view)


