import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { transform } from 'typescript';
import { flashAnimation } from '../../animations/flash.animation';
import { slideAndfadeAnnimation } from '../../animations/slide-flade.animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  animations:[
    trigger('list',[
      transition(':enter',[
        query('@listItem',[
          stagger(200,[
            animateChild()
          ])
        ])
      ])
    ]),
    trigger('listItem',[
      state('default',style({
        transform:'scale(1)',
        'background-color':"white",
        'z-index':1
      })),
      state('active',style({
        transform:'scale(1.05)',
        'background-color':'rgb(201,157,242)',
        'z-index':2
      })),
      transition('default=>active',[
        animate('100ms ease-in-out')
      ]),
      transition('default=>active',[
        animate('500ms ease-in-out')
      ]),
      transition(':enter',[
        query('.comment-texte, .comment-date',[
          style({
            opacity:0
          })
        ]),
        useAnimation(slideAndfadeAnnimation),
        group([
          useAnimation(flashAnimation,{
            params:{
              time:'1000ms',
              flashColor:`rgb(201,157,242)`
            }
          }),
          query('.comment-texte',[
            style({
              opacity:0
            }),
            animate('250ms',style({
              opacity:1
            }))
          ]),
          query('.comment-date',[
            style({
              opacity:0
            }),
            animate('500ms',style({
              opacity:1
            }))
          ])
        ]),
        
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit{
  @Input() comments!:Comment[];
  @Output() newComment=new EventEmitter<string>();
  commentCtrl!:FormControl;
  animationStates:{[key:number]:'default'|'active'}={}
  listItemAnnimationState:'default'|'active'='default'
  constructor(private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.commentCtrl=this.formBuilder.control('',[Validators.required,Validators.minLength(10)])
    for(let index in this.comments)
    {
      this.animationStates[index]='default'
    }
  }
  onLeaveComment(){
    if(this.commentCtrl.invalid)
    {
      return;
    }
    const maxId=Math.max(...this.comments.map(comment=>comment.id))
    this.comments.unshift({
      id:maxId+1,
      comment:this.commentCtrl.value,
      createdDate:new Date().toISOString(),
      userId:1
    })
    this.newComment.emit(this.commentCtrl.value)
    this.commentCtrl.reset();
  } 
  onListItemMouseEnter(index:number){
    this.animationStates[index]='active';
  }
  onListItemMouseLeave(index:number){
    this.animationStates[index]='default';
  }
}
