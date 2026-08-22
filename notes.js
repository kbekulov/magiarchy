const notesSidebar = document.querySelector('.notes-sidebar');

if (notesSidebar) {
  const notesList = notesSidebar.querySelector('.notes-list');
  const notesHeader = notesSidebar.querySelector('.notes-header');
  const notesFootnote = notesSidebar.querySelector('.notes-footnote');
  const fallbackContent = notesList?.cloneNode(true);
  const pageKey = document.body.dataset.notesPage || document.body.className.replace(/-page\b/g, '').trim() || 'page';
  const pageLabel = notesHeader?.querySelector(':scope > span')?.textContent.trim() || 'Page';
  const config = window.MAGIARCHY_NOTES_CONFIG;
  let notesClient;
  let currentSession = null;
  let isAdmin = false;
  let currentNotes = [];

  const makeButton = (label, className, action) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = label;
    button.addEventListener('click', action);
    return button;
  };

  const toolbar = document.createElement('div');
  toolbar.className = 'notes-live-toolbar';
  const connection = document.createElement('span');
  connection.className = 'notes-connection';
  connection.innerHTML = '<i></i><span>Connecting</span>';
  const actions = document.createElement('div');
  actions.className = 'notes-live-actions';
  toolbar.append(connection, actions);
  notesHeader?.after(toolbar);

  const feedback = document.createElement('p');
  feedback.className = 'notes-feedback';
  feedback.hidden = true;
  toolbar.after(feedback);

  const setFeedback = (message, tone = 'neutral') => {
    feedback.textContent = message;
    feedback.dataset.tone = tone;
    feedback.hidden = !message;
  };

  const setConnection = (label, state) => {
    connection.dataset.state = state;
    connection.querySelector('span').textContent = label;
  };

  const formatStatus = (status) => status.charAt(0).toUpperCase() + status.slice(1);

  const renderEmpty = () => {
    const empty = document.createElement('div');
    empty.className = 'notes-empty';
    empty.innerHTML = '<span aria-hidden="true">✓</span><strong>No open notes</strong><p>This page has no active notes.</p>';
    notesList.replaceChildren(empty);
  };

  const renderEditor = (note = null) => {
    const editor = document.createElement('form');
    editor.className = 'notes-editor';

    const heading = document.createElement('strong');
    heading.textContent = note ? 'Edit note' : `New ${pageLabel} note`;

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.name = 'title';
    titleInput.maxLength = 120;
    titleInput.required = true;
    titleInput.value = note?.title || '';
    titleLabel.append(titleInput);

    const bodyLabel = document.createElement('label');
    bodyLabel.textContent = 'Details';
    const bodyInput = document.createElement('textarea');
    bodyInput.name = 'body';
    bodyInput.rows = 4;
    bodyInput.maxLength = 800;
    bodyInput.value = note?.body || '';
    bodyLabel.append(bodyInput);

    const statusLabel = document.createElement('label');
    statusLabel.textContent = 'Status';
    const statusSelect = document.createElement('select');
    statusSelect.name = 'status';
    ['open', 'waiting', 'completed'].forEach((status) => {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = formatStatus(status);
      option.selected = (note?.status || 'open') === status;
      statusSelect.append(option);
    });
    statusLabel.append(statusSelect);

    const editorActions = document.createElement('div');
    editorActions.className = 'notes-editor-actions';
    const cancel = makeButton('Cancel', 'notes-button notes-button-muted', () => renderNotes());
    const save = document.createElement('button');
    save.type = 'submit';
    save.className = 'notes-button notes-button-primary';
    save.textContent = 'Save note';
    editorActions.append(cancel, save);
    editor.append(heading, titleLabel, bodyLabel, statusLabel, editorActions);

    editor.addEventListener('submit', async (event) => {
      event.preventDefault();
      save.disabled = true;
      save.textContent = 'Saving';
      const payload = {
        page_key: pageKey,
        title: titleInput.value.trim(),
        body: bodyInput.value.trim(),
        status: statusSelect.value,
        sort_order: note?.sort_order ?? currentNotes.length
      };

      const request = note
        ? notesClient.from('page_notes').update(payload).eq('id', note.id)
        : notesClient.from('page_notes').insert(payload);
      const { error } = await request;

      if (error) {
        setFeedback(error.message, 'error');
        save.disabled = false;
        save.textContent = 'Save note';
        return;
      }

      setFeedback(note ? 'Note updated.' : 'Note added.', 'success');
      await loadNotes();
    });

    notesList.replaceChildren(editor);
    titleInput.focus();
  };

  const deleteNote = async (note) => {
    if (!window.confirm(`Delete “${note.title}”?`)) return;
    const { error } = await notesClient.from('page_notes').delete().eq('id', note.id);
    if (error) {
      setFeedback(error.message, 'error');
      return;
    }
    setFeedback('Note deleted.', 'success');
    await loadNotes();
  };

  const renderNotes = () => {
    if (!notesList) return;
    if (!currentNotes.length) {
      renderEmpty();
      return;
    }

    notesList.replaceChildren(...currentNotes.map((note, index) => {
      const article = document.createElement('article');
      article.className = 'page-note live-page-note';
      article.dataset.status = note.status;

      const top = document.createElement('div');
      const state = document.createElement('span');
      state.className = `note-state${note.status === 'waiting' ? ' note-waiting' : ''}${note.status === 'completed' ? ' note-completed' : ''}`;
      state.textContent = formatStatus(note.status);
      const number = document.createElement('span');
      number.className = 'note-number';
      number.textContent = String(index + 1).padStart(2, '0');
      top.append(state, number);

      const title = document.createElement('h2');
      title.textContent = note.title;
      article.append(top, title);

      if (note.body) {
        const body = document.createElement('p');
        body.textContent = note.body;
        article.append(body);
      }

      if (isAdmin) {
        const noteActions = document.createElement('div');
        noteActions.className = 'note-card-actions';
        noteActions.append(
          makeButton('Edit', 'note-card-button', () => renderEditor(note)),
          makeButton('Delete', 'note-card-button note-card-delete', () => deleteNote(note))
        );
        article.append(noteActions);
      }

      return article;
    }));
  };

  const loadNotes = async () => {
    const { data, error } = await notesClient
      .from('page_notes')
      .select('id,page_key,title,body,status,sort_order,created_at,updated_at')
      .eq('page_key', pageKey)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;
    currentNotes = data || [];
    renderNotes();
  };

  const showSignIn = () => {
    const form = document.createElement('form');
    form.className = 'notes-auth-form';
    const label = document.createElement('label');
    label.textContent = 'Owner email';
    const input = document.createElement('input');
    input.type = 'email';
    input.required = true;
    input.autocomplete = 'email';
    input.placeholder = 'you@example.com';
    label.append(input);
    const formActions = document.createElement('div');
    formActions.className = 'notes-editor-actions';
    const cancel = makeButton('Cancel', 'notes-button notes-button-muted', renderToolbar);
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'notes-button notes-button-primary';
    submit.textContent = 'Email sign-in link';
    formActions.append(cancel, submit);
    form.append(label, formActions);
    actions.replaceChildren(form);
    input.focus();

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      submit.disabled = true;
      submit.textContent = 'Sending';
      const redirectUrl = `${window.location.origin}${window.location.pathname}`;
      const { error } = await notesClient.auth.signInWithOtp({
        email: input.value.trim(),
        options: { emailRedirectTo: redirectUrl }
      });
      if (error) {
        setFeedback(error.message, 'error');
        submit.disabled = false;
        submit.textContent = 'Email sign-in link';
        return;
      }
      setFeedback('Check your email for the secure sign-in link.', 'success');
      renderToolbar();
    });
  };

  const signOut = async () => {
    await notesClient.auth.signOut();
    currentSession = null;
    isAdmin = false;
    setFeedback('Signed out.', 'success');
    renderToolbar();
    renderNotes();
  };

  function renderToolbar() {
    actions.replaceChildren();
    if (currentSession && isAdmin) {
      actions.append(
        makeButton('Add note', 'notes-toolbar-button notes-toolbar-primary', () => renderEditor()),
        makeButton('Sign out', 'notes-toolbar-button', signOut)
      );
    } else if (currentSession) {
      actions.append(makeButton('Sign out', 'notes-toolbar-button', signOut));
    } else {
      actions.append(makeButton('Owner sign in', 'notes-toolbar-button', showSignIn));
    }
  }

  const refreshAuthorization = async (session) => {
    currentSession = session;
    isAdmin = false;

    if (session) {
      await notesClient.rpc('claim_notes_admin');
      const { data } = await notesClient
        .from('notes_admins')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();
      isAdmin = Boolean(data);
      if (!isAdmin) setFeedback('This account has read-only access.', 'neutral');
    }

    renderToolbar();
    renderNotes();
  };

  const initializeLiveNotes = async () => {
    if (!notesList || !config || !window.supabase || config.supabasePublishableKey === 'SUPABASE_PUBLISHABLE_KEY') {
      setConnection('Static fallback', 'offline');
      return;
    }

    try {
      notesClient = window.supabase.createClient(config.supabaseUrl, config.supabasePublishableKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
      const { data: { session } } = await notesClient.auth.getSession();
      await refreshAuthorization(session);
      await loadNotes();
      setConnection('Live notes', 'online');
      if (notesFootnote) notesFootnote.textContent = 'Notes are stored in Supabase and synchronized when this page loads.';

      notesClient.auth.onAuthStateChange((_event, nextSession) => {
        window.setTimeout(async () => {
          await refreshAuthorization(nextSession);
          await loadNotes();
        }, 0);
      });
    } catch (error) {
      console.error(error);
      setConnection('Static fallback', 'offline');
      setFeedback('Live notes are temporarily unavailable.', 'error');
      if (fallbackContent) notesList.replaceChildren(...fallbackContent.childNodes);
    }
  };

  initializeLiveNotes();
}
