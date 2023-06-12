import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/article';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent {
  articles!: Article[];

  constructor(private articleService: ArticleService,private router:Router,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService
      .getArticles()
      .subscribe((articles) => (this.articles = articles));
  }

  createArticle(): void {
    const newArticle: Article = {
      title: 'Post Title',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.',
      author: 'User',
      category: 'Word',
    };
    this.articleService
      .createArticle(newArticle)
      .subscribe((article) => this.articles.push(article));
  }
  
  viewArticle(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['articles/article-editor', id]);
    }
  }
  
  confirmDelete(id: number | undefined) {
    if (id !== undefined) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteArticle(id);
        }
      });
    }
  }

  deleteArticle(id: number | undefined) {
    if (id !== undefined) {
      this.articleService.deleteArticle(id).subscribe(() => {
        this.articles = this.articles.filter(article => article.id !== id);
      });
    }
  }
}
