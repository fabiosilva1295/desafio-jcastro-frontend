import { Injectable } from '@angular/core';
import { initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor() { }

  // Método para gerar um avatar com base no nome ou algum identificador
  generateAvatar(name: string): string {
    const avatar = createAvatar(initials, {
      seed: name,  // Aqui você pode usar o nome ou qualquer valor único para garantir a consistência
      size: 300,   // Tamanho do avatar gerado
    });

    return avatar.toDataUri();  // Retorna a URI do avatar gerado
  }
}
