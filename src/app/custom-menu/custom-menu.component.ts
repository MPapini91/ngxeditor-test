import { Component, Input, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';
import { setBlockType } from 'prosemirror-commands';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.css']
})
export class CustomMenuComponent implements OnInit {
  @Input({required: true}) editor!: Editor;
  isActive = false;
  isDisabled = false;

  onClick(e: MouseEvent) {
    e.preventDefault();
    const { state, dispatch } = this.editor.view;
    this.execute(state, dispatch);
  }

  execute(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const { schema }= state;
    if(this.isActive) {
      return setBlockType(schema.nodes['paragraph'])(state, dispatch);
    }
    return setBlockType(schema.nodes['code_mirron'])(state, dispatch);
  }

  update = (view: EditorView) => {
    const {state} = view;
    const { schema } = state;
    this.isActive = isNodeActive(state, schema.nodes['code_mirron']);
    this.isDisabled = !this.execute(state); //return true if executable
  }

  ngOnInit(): void {
    const plugin = new Plugin({
      key: new PluginKey('custom-menu-codemirror'),
      view: () => {
        return {
          update: this.update,
        };
      },
    });
    this.editor.registerPlugin(plugin)
  }
}
