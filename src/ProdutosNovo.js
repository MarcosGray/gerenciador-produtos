import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Produtos extends Component{
    constructor(props){
        super(props)         
        this.state = {
            redirect: false
        }
        this.handleNewProduto = this.handleNewProduto.bind(this)
    }
    handleNewProduto(){
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value 
        }    
        this.props.createProduto(produto).then(res => {
            this.setState({redirect: '/produtos/categoria/'+produto.categoria})
        })
    } 
    render(){
        const { categorias } = this.props   
        if(this.state.redirect){            
            return <Redirect to={this.state.redirect} /> 
        }
        return(
            <div className='col-md-6'>
                <h2>Novo Produto</h2>
                <div className='form-group'>
                    <select ref='categoria' className='form-control' >
                        {categorias.map(
                            (c) => <option key={c.id} value={c.id} >{c.categoria}</option>
                        )}
                    </select>
                </div>
                <div className='form-group'>
                    <input ref='produto' className='form-control' placeholder='Nome do novo produto' />
                </div>
                <div className='form-group'>
                    <button onClick={this.handleNewProduto} className='btn btn-primary'>Salvar</button>
                </div>
            </div>
        )
    }
} 

export default Produtos