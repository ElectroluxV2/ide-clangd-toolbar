'use babel';

import IdeClangdToolbarView from './ide-clangd-toolbar-view';
import { CompositeDisposable } from 'atom';

export default {

  ideClangdToolbarView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ideClangdToolbarView = new IdeClangdToolbarView(state.ideClangdToolbarViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ideClangdToolbarView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ide-clangd-toolbar:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ideClangdToolbarView.destroy();
  },

  serialize() {
    return {
      ideClangdToolbarViewState: this.ideClangdToolbarView.serialize()
    };
  },

  toggle() {
    console.log('IdeClangdToolbar was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
