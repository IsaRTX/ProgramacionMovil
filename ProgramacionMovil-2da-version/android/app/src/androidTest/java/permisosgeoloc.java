import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;

public class MainActivity extends AppCompatActivity {
  private static final int LOCATION_PERMISSION_REQUEST = 1;
  private LocationManager locationManager;
  private LocationListener locationListener;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Verificar y solicitar permisos de geolocalización
    if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST);
    } else {
      // Si los permisos ya se otorgaron, inicia la escucha de ubicación
      initLocationListener();
    }
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (requestCode == LOCATION_PERMISSION_REQUEST) {
      if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
        // Permiso otorgado, inicia la escucha de ubicación
        initLocationListener();
      }
    }
  }

  private void initLocationListener() {
    locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
    locationListener = new LocationListener() {
      @Override
      public void onLocationChanged(Location location) {
        // Aquí puedes manejar los datos de ubicación actual
      }

      @Override
      public void onStatusChanged(String provider, int status, Bundle extras) {
      }

      @Override
      public void onProviderEnabled(String provider) {
      }

      @Override
      public void onProviderDisabled(String provider) {
      }
    };

    // Comienza a escuchar las actualizaciones de ubicación
    locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, locationListener);
  }
}
