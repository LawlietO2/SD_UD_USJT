### Integrantes

Amanda Alves de Oliveira - RA: 820135445 <br>
Frederico Kenji Kaneto Monma - RA: 820148078 <br>
Jedaias Farias de Jesus - RA: 820146360 <br>
Mateus Oliveira Souza - RA: 820110893 <br>
Pedro Sérgio Oliveira Sousa - RA: 820150543 <br>
Rodrigo Peluso Craveiro - RA: 820273340 <br>
Victor Santos e Santos - RA: 820143889


-------      Barramento      -------

Anteriormente tentamos implementar o RabbitMq para realizar o papel do barramento de eventos, mas devido algumas complicações e tempo abandonamos essa ideia e utilizamos o barramento apresentado em aula.
Nesta nova versão nos implementamos um barramento de eventos, cuja a finalidade é efetuar a comunicação entre os dois microsserviços existentes (Login não participa das comunicações do barramento), para aumentar a eficiência do sistema, o funcionamento se dá da seguinte maneira: o primeiro microsserviço ao efetuar um cadastro no banco de dados, envia uma mensageria para o segundo microsserviço de fila, que então atualiza o sua base, permitindo uma maior modularização e coesão do sistema nas consultas ao banco. Da mesma forma quando alteramos o status de uma consulta, "Em andamento" ou "Finalizado" no microsserviço de especialidades nosso barramento também atualiza a base de pacientes.

-------      Link para a apresentação      -------

https://youtu.be/1tFia4cbkwQ
