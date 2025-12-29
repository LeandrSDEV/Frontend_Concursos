import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    concursosAprovados: ""
  });
  const [imagem, setImagem] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((k) => data.append(k, form[k]));
    data.append("imagem", imagem);

    await axios.post("http://localhost:8080/api/aprovados", data);
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className="container">
      <h2>Cadastro de Aprovados</h2>

      <form onSubmit={submit} className="form">
        <label>
          Nome
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Telefone
          <input
            type="text"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Concursos Aprovados
          <textarea
            name="concursosAprovados"
            value={form.concursosAprovados}
            onChange={handleChange}
            rows="3"
            required
          />
        </label>

        <label>
          Imagem
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files[0])}
            required
          />
        </label>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
