import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Categoria extends Component{
    constructor(props){
        super(props)
        this.loadData = this.loadData.bind(this)
        this.renderProduto = this.renderProduto.bind(this)
        this.state = {
            produtos: [],
            categoria: {},
            id: null
        }
    }
    loadData(id){
        this.setState({id})
        this.props.loadProdutos(id)
        this.props.loadCategoria(id)
    }
    componentDidMount(){
        const id = this.props.match.params.catId
        this.loadData(id)        
    } 
    componentWillReceiveProps(newProps){
        if (newProps.match.params.catId !== this.state.id) {
            this.loadData(newProps.match.params.catId)            
        }
    } 
    renderProduto(produto){
        return(
            <div className='well'>
                <p  key={produto.id}>
                    <div className='col-md-8'>
                        {produto.produto}
                    </div>
                    <div  className='col-md-4'>
                        <div className='col-md-6'>
                            <button className='btn btn-danger' onClick={() => {
                                this.props.removeProduto(produto).then(res => this.loadData(this.props.match.params.catId))
                            }} >
                                <span className='glyphicon glyphicon-trash'></span>
                            </button>
                        </div>
                        <div className='col-md-6'>
                            <Link to={'/produtos/editar/'+produto.id}>Editar</Link>
                        </div>
                    </div>
                </p>
                
            </div>
        )
    }
    render(){
        return(
            <div>
                <h2>{this.props.categoria && this.props.categoria.categoria}</h2>
                {this.props.produtos.length === 0 &&
                    <p className='alert alert-warning'>Nenhum item cadastrado.</p>
                }
                <p>{this.props.produtos.map(this.renderProduto)}</p>
            </div>
        )
        
    }
}

export default Categoria