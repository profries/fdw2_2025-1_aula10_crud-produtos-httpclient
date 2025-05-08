import { Component, EventEmitter, Output } from '@angular/core';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-produtos',
  standalone: false,
  templateUrl: './form-produtos.component.html',
  styleUrl: './form-produtos.component.css'
})
export class FormProdutosComponent {
  produto = new Produto();
  id?:number;
  botaoAcao = "Cadastrar";

  constructor(private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.params['id'];
    if(this.id) {
      this.botaoAcao = "Editar";
      this.produto = this.produtoService.buscarPorId(this.id);
    }
  }

  salvar(){ 
    if(this.id) { //Editar
      this.produtoService.editar(this.id, this.produto);
      alert("Produto editado com sucesso!")
    }
    else { //Cadastrar
      this.produtoService.inserir(this.produto);
      alert("Produto cadastrado com sucesso!")
      this.produto = new Produto();
    }
  }

  voltar() {
    this.router.navigate(['/tabela']);
  }
}
